import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updatePersonalInfo } from '../store/slices/resumeSlice';
import { PersonalInfo } from '../types';
import { PersonalInfoSchema, PersonalInfoFormData } from '../utils/schemas';

const defaultPersonalInfo = {} as PersonalInfo;

const PersonalForm = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state: any) => state.resume?.personalInfo || defaultPersonalInfo);

  const {
    register,
    watch,
    reset,
    formState: { errors,  isDirty },
  } = useForm<PersonalInfoFormData>({
    defaultValues: personalInfo,
    resolver: zodResolver(PersonalInfoSchema),
    mode: 'onChange',
  });

  // Watch for changes and sync to Redux
  useEffect(() => {
    const subscription = watch((value, { name }) => {
       if (name) {
           // name is FieldPath<PersonalInfoFormData>. Since our schema is flat (mostly), we can try to access.
           // However, safer to just dispatch the specific field if we can, or the whole object?
           // updatePersonalInfo accepts Partial<PersonalInfo>.
           // value is Partial<PersonalInfo>.
           // So why not dispatch updatePersonalInfo(value)?
           // Because value might be incomplete? No, watch returns current values merged.
           // But `value` from watch might define some fields as undefined.
           // Let's safe cast.
           const castValue = value as PersonalInfo;
           const fieldName = name as keyof PersonalInfo;
           
           if (Object.prototype.hasOwnProperty.call(castValue, fieldName)) {
                dispatch(updatePersonalInfo({ [fieldName]: castValue[fieldName] }));
           }
       }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  // Sync from Redux (e.g. File Upload) IF form is not dirty
  // This handles the "Import" case where we want the form to populate.
  // Sync from Redux (e.g. File Upload) IF form is not dirty
  useEffect(() => {
      if (!isDirty && personalInfo) {
          reset(personalInfo);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(personalInfo), reset, isDirty]);

  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        Let's start with the basics. Recruiters use this information to contact you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input 
          label="First Name"
          placeholder="e.g. John" 
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input 
          label="Last Name"
          placeholder="e.g. Doe" 
          error={errors.lastName?.message}
          {...register('lastName')}
        />
        <Input 
          label="Email Address"
          placeholder="john.doe@example.com" 
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input 
          label="Phone Number"
          placeholder="+1 234 567 890" 
          error={errors.phone?.message}
          {...register('phone')}
        />
        <div className="md:col-span-2">
          <Input 
            label="Address"
            placeholder="City, Country" 
            error={errors.address?.message}
            {...register('address')}
          />
        </div>
        <div className="md:col-span-2">
            <Input 
              label="Professional Summary"
              placeholder="Brief overview of your career..."
              error={errors.summary?.message}
              {...register('summary')}
            />
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;
