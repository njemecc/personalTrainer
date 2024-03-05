//styles
import styled from "styled-components";

//components
import Logo from "@/components/ui/Logo";
import AdminMainNav from "./AdminMainNav";

const StyledSidebar = styled.aside`
  height: 100vh;
  background-image: url("/assets/images/triangle-3.jpg");
  background-size: contain;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid rgb(229 231 235);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AdminSidebar = () => {
  return (
    <StyledSidebar>
      <h4 className="text-white text-center text-[1.2rem]">
        <span className="text-gold">Admin</span> funkcionalnosti
      </h4>
      <Logo />

      <AdminMainNav />
    </StyledSidebar>
  );
};

export default AdminSidebar;
