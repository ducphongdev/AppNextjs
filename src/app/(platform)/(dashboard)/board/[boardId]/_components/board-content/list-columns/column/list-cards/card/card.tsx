import { BarsLeftIcon, ClockIcon } from "@/components/icons/icons";
import { Cards } from "@/app/_types/board.type";
import Button from "@/components/button";

interface CardProps {
  card: Cards;
}

function Card({ card }: CardProps) {
  return (
    <li className="flex pb-2">
      <div className="w-full rounded-lg cursor-pointer shadow-sm border-2 bg-slate-300 border-transparent hover:border-black">
        {card?.cover && (
          //   <div className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x641/8da45cd6f02259e58cf77cb0c23b6fb7/photo-1702933018110-883638b70eeb.jpg')] bg-white min-h-40 bg-cover rounded-t-md"></div>
          <div
            className="bg-white min-h-40 bg-cover rounded-t-md"
            style={{ backgroundImage: `url(${card?.cover})` }}
          ></div>
        )}
        <div className="px-2 pt-2 pb-[2px]">
          <a href="">{card?.title}</a>
        </div>
        <div className="flex justify-around items-center">
          <span className="flex justify-between items-center">
            <span>
              <ClockIcon className="w-4 mr-1" />
            </span>
            <span className="text-xs">24 Th01 2024 - 25 Th01 2024</span>
          </span>

          <span>
            <BarsLeftIcon className="w-4" />
          </span>
        </div>
        <div className="px-2">
          <Button className="ml-2 hover:rounded-full float-right my-1 relative rounded-full">
            <span className="absolute top-0 bg-[url('https://trello-members.s3.amazonaws.com/65308a6d53b5d525b1ffd4ca/f7d876d63789b6fb53d17741c2f417c2/50.png')] w-full h-full bg-white bg-cover rounded-t-md"></span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default Card;
