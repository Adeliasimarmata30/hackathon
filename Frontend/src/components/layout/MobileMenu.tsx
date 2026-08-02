import { X } from "lucide-react";
import { NAVIGATION } from "../../constants/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (

    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/40
      backdrop-blur-sm
      lg:hidden
      "
    >

      <div
        className="
        absolute
        right-0
        top-0
        h-full
        w-72
        bg-white
        p-8
        shadow-2xl
        "
      >

        <div className="mb-10 flex justify-end">

          <button onClick={onClose}>

            <X />

          </button>

        </div>

        <div className="space-y-6">

          {NAVIGATION.map((item) => (

            <a
              key={item.title}
              href={item.href}
              onClick={onClose}
              className="block text-lg font-medium"
            >
              {item.title}
            </a>

          ))}

        </div>

      </div>

    </div>

  );

}