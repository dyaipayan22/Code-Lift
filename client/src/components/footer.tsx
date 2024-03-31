const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full flex items-center justify-center py-8">
      <span>&copy; {currentYear}</span>
    </div>
  );
};

export default Footer;
