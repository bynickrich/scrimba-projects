import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="flex flex-col gap-10 items-start lg:flex-row lg:p-10 lg:gap-20 lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 lg:gap-5 lg:max-w-150">
          <p className="hidden md:block uppercase font-body tracking-wider self-start">
            your go-to platform for 3d printing files
          </p>
          <h1 className="font-bold text-[2.5rem] text-neutral-900 leading-tight font-display">
            Discover what&apos;s possible with 3D printing
          </h1>
          <p className="text-2xl text-neutral-900 leading-tight font-body">
            Join our community of creators and explore a vast library of user-submitted models.
          </p>
          <button className="uppercase font-semibold text-xl text-neutral-900 p-3 border-2 border-neutral-900 h-12 leading-none font-body self-start lg:mt-">
            Browse Models
          </button>
        </div>
        <Image
          src="/hero-image.webp"
          alt="3D printed buildings, statues, and other objects"
          width={627}
          height={627}
          loading="eager"
        />
      </section>
    </main>
  );
}
