import { Logo } from "@/assets/svgs/Logo";

const Footer = () => (
  <footer className="bg-primary py-12">
    <div className="containe r mx-auto text-white flex items-center gap-5 sm:justify-between flex-col sm:flex-row">
      <Logo />
      <div className="flex flex-col items-center">
        <p>Copyright &copy; {new Date().getFullYear()}, All Right Reserved,</p>
      </div>
    </div>
  </footer>
);

export default Footer;
