import Image from "next/image";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  align-self: center;
  border: 1px solid white;
`;

const Img = styled.img`
  height: 16.6rem;
  width: auto;
`;

const Logo = () => {
  return (
    <StyledLogo>
      <Image
        width={150}
        height={150}
        src="/assets/images/stoji-ukoso-goldbg.png"
        alt="logo"
      />
    </StyledLogo>
  );
};

export default Logo;
