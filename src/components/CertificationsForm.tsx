
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
import { setCertifications } from '../store/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CertificationSchema } from '../utils/schemas';

const CertificationsFormSchema = z.object({
  certifications: z.array(CertificationSchema)
});

type CertificationsFormValues = z.infer<typeof CertificationsFormSchema>;

const CertificationsForm = () => {
  const dispatch = useAppDispatch();
  const certificationsData = useAppSelector((state: any) => state.resume?.certifications || []);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<CertificationsFormValues>({
    defaultValues: { certifications: certificationsData },
    resolver: zodResolver(CertificationsFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'certifications',
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
  const watchedCertifications = useWatch({ control, name: 'certifications' });

  useEffect(() => {
      dispatch(setCertifications(watchedCertifications as any));
  }, [watchedCertifications, dispatch]);

  const handleAdd = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    });
  };

  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        Certifications and licenses.
      </p>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            {fields.map((field, index) => (
                <SortableWrapper key={field.id} id={field.id}>
                    {(listeners) => (
                        <div className="mb-6 md:mb-10 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100 relative group transition-all hover:border-blue-200 hover:shadow-sm">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <div className="flex items-center gap-3">
                                    <DragHandle listeners={listeners} />
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
                                    Certification {index + 1}
                                    </span>
                                </div>
                                <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-1">
                                    <span>Remove</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <Input 
                                    label="Name"
                                    placeholder="e.g. AWS Certified Solutions Architect" 
                                    error={errors.certifications?.[index]?.name?.message}
                                    {...register(`certifications.${index}.name`)}
                                />
                                <Input 
                                    label="Issuer"
                                    placeholder="e.g. Amazon Web Services" 
                                    error={errors.certifications?.[index]?.issuer?.message}
                                    {...register(`certifications.${index}.issuer`)}
                                />
                                <Input 
                                    label="Date"
                                    type="month"
                                    error={errors.certifications?.[index]?.date?.message}
                                    {...register(`certifications.${index}.date`)}
                                />
                                <Input 
                                    label="Link (Optional)"
                                    placeholder="https://..." 
                                    error={errors.certifications?.[index]?.link?.message}
                                    {...register(`certifications.${index}.link`)}
                                />
                            </div>
                        </div>
                    )}
                </SortableWrapper>
            ))}
        </SortableContext>
      </DndContext>
      
      <button type="button" onClick={handleAdd} className="text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;
