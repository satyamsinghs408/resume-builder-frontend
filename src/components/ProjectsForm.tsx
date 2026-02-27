
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
import { setProjects } from '../store/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ProjectSchema } from '../utils/schemas';

const ProjectsFormSchema = z.object({
  projects: z.array(ProjectSchema)
});

type ProjectsFormValues = z.infer<typeof ProjectsFormSchema>;

const ProjectsForm = () => {
  const dispatch = useAppDispatch();
  const resumeData = useAppSelector((state: any) => state.resume);
  const projectsData = resumeData?.projects || [];
  const lastImportTimestamp = resumeData?.lastImportTimestamp || 0;

  const {
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectsFormValues>({
    defaultValues: { projects: projectsData },
    resolver: zodResolver(ProjectsFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'projects',
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
  const watchedProjects = useWatch({ control, name: 'projects' });

  useEffect(() => {
      dispatch(setProjects(watchedProjects as any));
  }, [watchedProjects, dispatch]);

  // Sync from Redux (e.g. File Upload) OUTSIDE of infinite loops
  useEffect(() => {
      if (lastImportTimestamp > 0 && projectsData) {
          reset({ projects: projectsData });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastImportTimestamp, reset]);

  const handleAdd = () => {
    append({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      technologies: [],
      link: ''
    });
  };

  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-2 md:mb-2">
        Showcase your best work.
      </p>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            {fields.map((field, index) => (
                <SortableWrapper key={field.id} id={field.id}>
                    {(listeners) => (
                        <div className="mb-2 md:mb-2 p-2 md:p-2 bg-gray-50 rounded-xl border border-gray-100 relative group transition-all hover:border-blue-200 hover:shadow-sm">
                            <div className="flex justify-between items-center mb-2 md:mb-2">
                                <div className="flex items-center gap-3">
                                    <DragHandle listeners={listeners} />
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
                                    Project {index + 1}
                                    </span>
                                </div>
                                <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-1">
                                    <span>Remove</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-2 md:gap-2">
                                <Input 
                                    label="Project Title"
                                    placeholder="e.g. E-commerce Platform" 
                                    error={errors.projects?.[index]?.title?.message}
                                    {...register(`projects.${index}.title`)}
                                />
                                <Input 
                                    label="Link (Optional)"
                                    placeholder="https://github.com/..." 
                                    error={errors.projects?.[index]?.link?.message}
                                    {...register(`projects.${index}.link`)}
                                />
                                
                                <div>
                                    <label className="text-sm font-bold text-gray-600 tracking-wide uppercase mb-2 block">Technologies (comma separated)</label>
                                    <Input 
                                        placeholder="React, Node.js, MongoDB"
                                        defaultValue={field.technologies?.join(', ')}
                                        onChange={(e) => {
                                            const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                            setValue(`projects.${index}.technologies`, val, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                                        }} 
                                    />
                                    {/* Registering hidden field to make sure it exists in the form state */}
                                    <input type="hidden" {...register(`projects.${index}.technologies`)} />
                                </div>

                                <TextArea 
                                    label="Description"
                                    placeholder="Describe what you built and the impact..." 
                                    error={errors.projects?.[index]?.description?.message}
                                    {...register(`projects.${index}.description`)}
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
        Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
