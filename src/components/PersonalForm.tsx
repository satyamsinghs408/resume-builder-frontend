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
           const castValue = value as PersonalInfo;
           
           if (name.startsWith('socialLinks.')) {
               // Handle nested social links update
               const socialField = name.split('.')[1] as keyof NonNullable<PersonalInfo['socialLinks']>;
               if (castValue.socialLinks && castValue.socialLinks[socialField] !== undefined) {
                   dispatch(updatePersonalInfo({ 
                       socialLinks: { 
                           ...personalInfo.socialLinks, 
                           [socialField]: castValue.socialLinks[socialField] 
                       } 
                   }));
               }
           } else {
               // Handle top-level fields
               const fieldName = name as keyof PersonalInfo;
               if (Object.prototype.hasOwnProperty.call(castValue, fieldName)) {
                    dispatch(updatePersonalInfo({ [fieldName]: castValue[fieldName] }));
               }
           }
       }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, personalInfo]);

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

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
             <Input 
                label="LinkedIn"
                placeholder="linkedin.com/in/..."
                {...register('socialLinks.linkedin')}
             />
             <Input 
                label="GitHub"
                placeholder="github.com/..."
                {...register('socialLinks.github')}
             />
             <Input 
                label="Portfolio/Website"
                placeholder="yoursite.com"
                {...register('socialLinks.portfolio')}
             />
             <Input 
                label="Twitter/X"
                placeholder="twitter.com/..."
                {...register('socialLinks.twitter')}
             />
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;
