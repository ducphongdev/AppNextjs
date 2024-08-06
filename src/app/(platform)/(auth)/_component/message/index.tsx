import { ErrorIcon } from '@/components/icons';

function Message({ messageError }: { messageError: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-start p-2 bg-yellow-100 mb">
        <div className="pr-2 pt-2">
          <ErrorIcon className="w-5 text-red-500" />
        </div>
        <p className="font-extralight text-sm mt-1">{messageError}</p>
      </div>
    </div>
  );
}

export default Message;
