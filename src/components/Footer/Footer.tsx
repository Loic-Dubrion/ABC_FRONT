import { useAppSelector } from '../../redux/hooks';

function Footer() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return (
    <footer
      className={`footer p-6 bg-[#e5e6e6] text-base-content bottom-0 rounded-box ${
        isLogged ? 'sticky' : 'fixed'
      }`}
    >
      <p className="m-auto">© 2023 Castor™. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
