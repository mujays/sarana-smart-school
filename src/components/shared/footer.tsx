import AppPadding from "@/components/shared/app-padding";
import Image from "next/image";

function Footer() {
  return (
    <>
      <AppPadding>
        <footer className="bg-primary py-5 rounded-t-xl">
          <AppPadding className="space-y-5">
            <Image
              width={500}
              height={300}
              priority
              alt="Logo SD"
              src="/images/logo-sd-white.svg"
              style={{
                width: "170px",
                height: "auto",
              }}
            />
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-5 justify-between text-primary-foreground">
              <div className="space-y-5 w-full">
                <p className="font-medium">Sekolah Adab Kepimimpinan</p>
                <div className="flex gap-3 items-center">
                  <Image
                    width={50}
                    height={30}
                    priority
                    alt="Location"
                    src="/images/icon/pin.svg"
                    style={{
                      width: "30px",
                      height: "auto",
                    }}
                  />
                  <p>Jl.Kecapi No.49 Jagakarsa Jakarta Selatan</p>
                </div>
              </div>
              <div className="space-y-5 w-full">
                <p className="font-medium">Hubungi Kami</p>
                <div className="flex gap-3 items-center">
                  <Image
                    width={50}
                    height={30}
                    priority
                    alt="Telepon"
                    src="/images/icon/telepon.svg"
                    style={{
                      width: "20px",
                      height: "auto",
                    }}
                  />
                  <p className="text-sm">Telpon : (021) 7888 5945</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Image
                    width={50}
                    height={30}
                    priority
                    alt="FAX"
                    src="/images/icon/envelope.svg"
                    style={{
                      width: "20px",
                      height: "auto",
                    }}
                  />
                  <p className="text-sm">FAX : (021) 787 2540</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Image
                    width={50}
                    height={30}
                    priority
                    alt="Email"
                    src="/images/icon/fax.svg"
                    style={{
                      width: "20px",
                      height: "auto",
                    }}
                  />
                  <p className="text-sm">Email : smartschooljagakarsa@gmail.com</p>
                </div>
              </div>
              <div className="space-y-5 w-full">
                <p className="font-medium">Social Media Kami</p>
                <div className="flex gap-3 items-center">
                  <Image
                    width={50}
                    height={30}
                    priority
                    alt="Instagram"
                    src="/images/icon/instagram.svg"
                    style={{
                      width: "20px",
                      height: "auto",
                    }}
                  />
                  <p className="text-sm">Instagram</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Image
                    width={50}
                    height={30}
                    priority
                    alt="Youtube"
                    src="/images/icon/youtube.svg"
                    style={{
                      width: "20px",
                      height: "auto",
                    }}
                  />
                  <p className="text-sm">Youtube</p>
                </div>
              </div>
            </div>
          </AppPadding>
          <div className="h-[1px] bg-white mx-20 mt-10"></div>
          <p className="mx-20 text-white mt-5">Copyright {new Date().getFullYear()} SD Smart School. All rights reserved.</p>
        </footer>
      </AppPadding>
      <div className="h-14 bg-black"></div>
    </>
  );
}

export default Footer;
