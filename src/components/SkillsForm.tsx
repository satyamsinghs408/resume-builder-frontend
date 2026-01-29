import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

import { Input } from './ui';
import { SortableWrapper, DragHandle } from './ui/SortableWrapper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSkills } from '../store/slices/resumeSlice';

// Define schema for the form structure - Skills is simple array of strings
// But useFieldArray works best with objects. 
// We will wrap strings in objects for the form { value: string } and unwrap on dispatch.
const SkillsFormSchema = z.object({
  skills: z.array(z.object({
      id: z.string(),
      value: z.string().min(1, "Skill cannot be empty")
  }))
});

type SkillsFormValues = z.infer<typeof SkillsFormSchema>;

const SkillsForm = () => {
  const dispatch = useAppDispatch();
  const skillsData = useAppSelector((state: any) => state.resume?.skills || []);

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<SkillsFormValues>({
    defaultValues: { 
        skills: skillsData.map((s: string) => ({ id: crypto.randomUUID(), value: s })) 
    },
    resolver: zodResolver(SkillsFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills',
  });

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

  // Watch for changes and sync to Redux
  useEffect(() => {
    const subscription = watch((value) => {
       if (value.skills) {
           // Unwrap the objects back to string array
           const cleanSkills = value.skills
                .map((s) => s?.value || '')
                .filter((s) => s !== '');
           dispatch(setSkills(cleanSkills));
       }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const handleAdd = () => {
    append({ id: crypto.randomUUID(), value: '' });
  };

  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        List your technical and soft skills.
      </p>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field, index) => (
                <SortableWrapper key={field.id} id={field.id}>
                    {(listeners) => (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 group">
                            <DragHandle listeners={listeners} />
                             <div className="flex-1">
                                <Input 
                                    placeholder="e.g. React" 
                                    className="py-2! px-3! bg-white!"
                                    error={errors.skills?.[index]?.value?.message}
                                    {...register(`skills.${index}.value`)}
                                />
                             </div>
                            <button 
                                type="button" 
                                onClick={() => remove(index)} 
                                className="text-gray-400 hover:text-red-500 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </SortableWrapper>
            ))}
            </div>
        </SortableContext>
      </DndContext>
      
      <button 
        type="button" 
        onClick={handleAdd} 
        className="mt-6 text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add Skill
      </button>
    </div>
  );
};

export default SkillsForm;
