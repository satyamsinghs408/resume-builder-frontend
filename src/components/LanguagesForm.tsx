
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

import { Input } from './ui';
import { SortableWrapper, DragHandle } from './ui/SortableWrapper';
import { setLanguages } from '../store/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LanguageSchema } from '../utils/schemas';

const LanguagesFormSchema = z.object({
  languages: z.array(LanguageSchema)
});

type LanguagesFormValues = z.infer<typeof LanguagesFormSchema>;

const LanguagesForm = () => {
  const dispatch = useAppDispatch();
  const languagesData = useAppSelector((state: any) => state.resume?.languages || []);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<LanguagesFormValues>({
    defaultValues: { languages: languagesData },
    resolver: zodResolver(LanguagesFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'languages',
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

  // Robust Sync with Redux using useWatch
  const watchedLanguages = useWatch({ control, name: 'languages' });

  useEffect(() => {
      dispatch(setLanguages(watchedLanguages as any));
  }, [watchedLanguages, dispatch]);

  const handleAdd = () => {
    append({
      id: crypto.randomUUID(),
      language: '',
      proficiency: ''
    });
  };

  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        Languages you speak.
      </p>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
                <SortableWrapper key={field.id} id={field.id}>
                    {(listeners) => (
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group transition-all hover:border-blue-200 hover:shadow-sm">
                             <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <DragHandle listeners={listeners} />
                                </div>
                                <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-3">
                                <Input 
                                    label="Language"
                                    placeholder="e.g. English" 
                                    error={errors.languages?.[index]?.language?.message}
                                    {...register(`languages.${index}.language`)}
                                />
                                <Input 
                                    label="Proficiency"
                                    placeholder="e.g. Native" 
                                    error={errors.languages?.[index]?.proficiency?.message}
                                    {...register(`languages.${index}.proficiency`)}
                                />
                            </div>
                        </div>
                    )}
                </SortableWrapper>
            ))}
            </div>
        </SortableContext>
      </DndContext>
      
      <button type="button" onClick={handleAdd} className="mt-6 text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add Language
      </button>
    </div>
  );
};

export default LanguagesForm;
