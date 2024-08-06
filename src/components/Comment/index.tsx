import { URL_IMG_DEFAULT } from '@/utils/constants';
import Image from '../Image';
import Button from '../button';
import { BarsThreeIcon } from '../icons';

function Comment() {
  return (
    <div className="float-left w-full mb-2 mr-2">
      <div className="relative flex justify-between items-center mb-1">
        <span className="absolute left-[-30px] top-1">
          <BarsThreeIcon className="w-7" />
        </span>
        <h3 className="text-base text-slate-400 ml-2">Hoạt động</h3>
        <div>
          <Button size="inline" variant="box" className="text-slate-300">
            Hiện chi tiết
          </Button>
        </div>
      </div>

      <div className="relative ml-2">
        <div className="absolute left-[-48px] top-2">
          <Button className="ml-2 relative hover:rounded-full">
            <Image
              className={'rounded-full'}
              src={undefined}
              fallBack={URL_IMG_DEFAULT}
              alt="anh user"
            />
          </Button>
        </div>
        <div className="rounded-md pt-2">
          <input
            className="text-sm w-full bg-input text-slate-300 px-3 rounded-md py-2"
            placeholder="Viết bình luận"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
}

export default Comment;
