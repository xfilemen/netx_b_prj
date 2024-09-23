import Image from 'next/image';

export default function RegularPage() {
  return (
    <div>
      <h1>
        <Image 
            src="/images/detail/diware_logo_img.png"
            alt="DIware"
          />
      </h1>
      <p>This is the deteil page.</p>
    </div>
  );
}