import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export interface EmailFormData {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
}

export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  } else {
    console.warn('EmailJS public key not found in environment variables');
  }
};

export const sendEmail = async (
  formData: EmailFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    if (
      !EMAILJS_CONFIG.serviceId ||
      !EMAILJS_CONFIG.templateId ||
      !EMAILJS_CONFIG.publicKey
    ) {
      throw new Error(
        'EmailJS configuration is incomplete. Please check your environment variables.'
      );
    }

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message,
      to_name: formData.to_name || 'Abdelrahmane',
      reply_to: formData.from_email,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Email sent successfully!',
    };
  } catch (error) {
    console.error('Error sending email:', error);

    let errorMessage = 'Failed to send email. Please try again.';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const checkEmailJSConfig = (): {
  isValid: boolean;
  missingVars: string[];
} => {
  const requiredVars = [
    { key: 'VITE_EMAILJS_SERVICE_ID', value: EMAILJS_CONFIG.serviceId },
    { key: 'VITE_EMAILJS_TEMPLATE_ID', value: EMAILJS_CONFIG.templateId },
    { key: 'VITE_EMAILJS_PUBLIC_KEY', value: EMAILJS_CONFIG.publicKey },
  ];

  const missingVars = requiredVars
    .filter(({ value }) => !value)
    .map(({ key }) => key);

  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
};
