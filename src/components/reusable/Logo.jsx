import { gymLogo } from "../../assets";

const Logo = () => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-0.5 xl:gap-1">
        <img
          src={gymLogo}
          alt="gym logo"
          className="h-[26px] w-[30px] rounded bg-primary object-cover xl:h-8 xl:w-10"
        />
        <div className="font-semibold xl:text-lg">
          Roar<span className="text-primary">Fitness</span>
        </div>
      </div>
      <div className="text-[10px] xl:text-xs">Transform Your Body</div>
    </div>
  );
};

export default Logo;
