import AppPadding from "@/components/shared/app-padding";
import Image from "next/image";

function AboutMe() {
  return (
    <AppPadding className="space-y-14 pb-10">
      <div className="flex flex-col justify-between items-center gap-y-4 md:flex-row py-10">
        <div className="md:basis-6/12 md:items-center space-y-2">
          <p className="text-primary text-2xl font-bold">Profil Sekolah</p>
          <p className="text-primary">
            SD Smart School berdiri tahun 2006 oleh Yayasan Pendidikan Cerdas
            dan sudah terakreditasi A
          </p>
        </div>
        <div className="md:basis-6/12">
          <Image
            width={500}
            height={300}
            priority
            alt="Halaman Sekolah"
            src="/images/school.png"
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold text-primary">
          Komitmen Yayasan Pendidikan Cerdas
        </h1>
        <p className="text-primary">
          Yayasan Pendidikan Cerdas mendirikan lembaga pendidikan SD Smart
          School adalah tidak untuk bisnis (not-for-profit). Pembiayaan
          operasional sekolah dikelola secara mandiri dari biaya pendidikan yang
          dibayarkan orang tua murid. Biaya pendidikan tersebut digunakan untuk
          keperluan proses belajar mengajar, kesejahteraan guru dan fasilitas
          dasar sekolah. Adapun jika ada kelebihan biaya, maka akan digunakan
          untuk meningkatkan kualitas dan kesejahteraan guru, serta pengembangan
          sekolah
        </p>
      </div>

      <div className="flex flex-col justify-between gap-x-10 gap-y-10 md:flex-row py-10">
        <div className="md:basis-6/12 space-y-2">
          <p className="text-primary text-xl font-bold text-center">
            Pendekatan yang kami lakukan
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Pendekatan"
            src="/images/pendekatan.png"
            className="w-full object-cover"
          />
        </div>
        <div className="md:basis-6/12 space-y-2">
          <p className="text-primary text-xl font-bold text-center">
            Strategi Melaksanakan Program Unggulan
          </p>
          <ul className="list-disc text-primary space-y-2">
            <li>Mengedepankan pembiasaan adab mendahului ilmu</li>
            <li>
              Melakukan pembelajaran integratif muatan akademik dengan
              pembiasaan adab
            </li>
            <li>Menumbuhkembangkan karakter</li>
            <li>
              Mengaktualisasikan dan menumbuhkan jiwa kepemimpinan dalam pribadi
              murid
            </li>
            <li>
              Menumbuhkan keterampilan emosi melalui pendekatan responsive
              classroom
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-x-10 gap-y-10 md:flex-row">
        <div className="md:basis-6/12 space-y-2">
          <p className="text-primary text-xl font-bold text-center mb-7">
            Guru kami berdedikasi dengan penuh semangat bekerja sama sebagai Tim
            Smart
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Guru"
            src="/images/teacher.png"
            className="w-full object-cover"
          />
          <Image
            width={500}
            height={300}
            priority
            alt="Guru"
            src="/images/university.png"
            className="w-full object-cover"
          />
        </div>
        <div className="md:basis-6/12 space-y-2">
          <p className="text-primary text-xl font-bold text-center mb-7">
            Peningkatan Mutu Guru SD Smart School
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Mutu"
            src="/images/peningkatan-mutu.png"
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-x-10 gap-y-10 md:flex-row">
        <div className="md:basis-6/12 space-y-2">
          <p className="text-primary text-xl font-bold text-center mb-5">
            Tanggung Jawab Sosial Sekolah
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Sosial"
            src="/images/tanggung-jawab.png"
            className="w-full object-cover"
          />
        </div>
        <div className="md:basis-6/12 space-y-2 flex flex-col items-center">
          <p className="text-primary text-xl font-bold text-center mb-2">
            Karya Guru & Siswa
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Karya"
            src="/images/karya-1.png"
            className="w-[70%] object-cover"
          />
          <Image
            width={500}
            height={300}
            priority
            alt="Karya"
            src="/images/karya-2.png"
            className="w-[70%] object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-x-10 gap-y-10 md:flex-row">
        <div className="md:basis-6/12 space-y-2 flex flex-col items-center">
          <p className="text-primary text-xl font-bold text-center mb-2">
            Penjelasan Buku
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Buku"
            src="/images/qr-buku.png"
            className="w-[50%] object-cover"
          />
        </div>
        <div className="md:basis-6/12 space-y-2 flex flex-col items-center">
          <p className="text-primary text-xl font-bold text-center mb-5">
            Alur Pendaftaran
          </p>
          <Image
            width={500}
            height={300}
            priority
            alt="Pendaftaran"
            src="/images/flow.png"
            className="w-[50%] object-cover"
          />
        </div>
      </div>
    </AppPadding>
  );
}

export default AboutMe;
