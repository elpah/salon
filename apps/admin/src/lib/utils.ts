import { toast } from 'react-toastify';

export type SectionProps = {
  header: string;
  subHeader: string;
  hasButton: boolean;
};

const notifySuccess = (message: string) => {
  toast.success(message, {});
};

const notifyError = (message: string) => {
  toast.error(message, {});
};

export { notifySuccess, notifyError };
