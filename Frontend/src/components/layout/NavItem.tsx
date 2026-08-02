
import { Link } from "react-router-dom";interface Props {
  title: string;
  href: string;
}

export default function NavItem({
  title,
  href,
}: Props) {
  return (
    <a
      href={href}
      className="
        relative
        font-medium
        text-slate-700
        transition-all
        duration-300
        hover:text-[#0F4C81]

        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[2px]
        after:w-0
        after:bg-[#0F4C81]
        after:transition-all
        after:duration-300

        hover:after:w-full
      "
    >
      {title}
    </a>
  );
}