"use client";
//styles
import styled from "styled-components";

//components
import AdminSidebar from "./AdminSidebar";
import { MobileAdminNavbar } from "./MobileAdminNavbar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: auto;
  height: 100vh;

  @media (max-width: 670px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StyledAppLayout>
        <div>
          <div className="hidden md:block">
            <AdminSidebar />
          </div>
          <div className="md:hidden">
            <MobileAdminNavbar />
          </div>
        </div>
        <Main>
          <Container>{children}</Container>
        </Main>
      </StyledAppLayout>
    </>
  );
};

export default AdminLayout;
