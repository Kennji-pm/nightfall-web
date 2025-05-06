import Image from "next/image";

export function Logo() {
  return (
    <>
      <div className="flex items-center gap-2 group">
        <div className="w-15 h-15 rounded-lg grid place-items-center transition-transform duration-300 shadow-lg">
          <Image
            src={"/images/logo.png"}
            alt="Nightfall Assault Logo"
            width={50}
            height={50}
            className="w-15 h-15 object-cover rounded-2xl"
          ></Image>
        </div>
        <span className="font-bold text-xl relative overflow-hidden group-hover:text-primary transition-colors duration-300">
          Nightfall Assault
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </span>
      </div>
    </>
  );
}
