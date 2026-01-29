import { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';

import { Input, TextArea } from './ui';
import { SortableWrapper, DragHandle } from './ui/SortableWrapper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setExperience } from '../store/slices/resumeSlice';
import { Experience } from '../types';
import { ExperienceSchema } from '../utils/schemas';

// Define schema for the form structure
const ExperienceFormSchema = z.object({
  experience: z.array(ExperienceSchema)
});

type ExperienceFormValues = z.infer<typeof ExperienceFormSchema>;

const defaultExperience: Experience[] = [];

const ExperienceForm = () => {
  const dispatch = useAppDispatch();
  const experienceData = useAppSelector((state: any) => state.resume?.experience || defaultExperience) as Experience[];

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    defaultValues: { experience: experienceData },
    resolver: zodResolver(ExperienceFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'experience',
  });

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
          move(oldIndex, newIndex);
      }
    }
  };

  // Robust Sync with Redux using useWatch
  const watchedExperience = useWatch({ control, name: 'experience' });

  useEffect(() => {
      dispatch(setExperience(watchedExperience as Experience[]));
  }, [watchedExperience, dispatch]);

  const handleAdd = () => {
    append({
      id: crypto.randomUUID(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        Highlight your career history. Start with your most recent position.
      </p>
      
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
            items={fields} 
            strategy={verticalListSortingStrategy}
        >
            {fields.map((field, index) => (
                <SortableWrapper key={field.id} id={field.id}>
                    {(listeners) => (
                        <div className="mb-6 md:mb-10 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100 relative group transition-all hover:border-blue-200 hover:shadow-sm">
                        {/* Header for Job Block */}
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <div className="flex items-center gap-3">
                                <DragHandle listeners={listeners} />
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
                                Position {index + 1}
                                </span>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => remove(index)} 
                                className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-1"
                            >
                                <span>Remove</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <Input 
                                label="Job Title"
                                placeholder="e.g. Senior Software Engineer" 
                                error={errors.experience?.[index]?.title?.message}
                                {...register(`experience.${index}.title`)}
                                />
                                <Input 
                                label="Company Name"
                                placeholder="e.g. Google" 
                                error={errors.experience?.[index]?.company?.message}
                                {...register(`experience.${index}.company`)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <Input 
                                label="Start Date"
                                type="month"
                                error={errors.experience?.[index]?.startDate?.message}
                                {...register(`experience.${index}.startDate`)}
                                />
                                <div className="flex flex-col gap-2">
                                    <Input 
                                    label="End Date"
                                    type="month"
                                    error={errors.experience?.[index]?.endDate?.message}
                                    {...register(`experience.${index}.endDate`)}
                                    disabled={watch(`experience.${index}.current`)}
                                    />
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            {...register(`experience.${index}.current`)}
                                        />
                                        I currently work here
                                    </label>
                                </div>
                            </div>
                            
                            <TextArea 
                            label="Description & Achievements"
                            placeholder="• Developed new features...&#10;• Improved performance by 20%..." 
                            error={errors.experience?.[index]?.description?.message}
                            {...register(`experience.${index}.description`)}
                            />
                        </div>
                        </div>
                    )}
                </SortableWrapper>
            ))}
        </SortableContext>
      </DndContext>
      
      <button 
        type="button" 
        onClick={handleAdd} 
        className="text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add Another Position
      </button>
    </div>
  );
};

export default ExperienceForm;
