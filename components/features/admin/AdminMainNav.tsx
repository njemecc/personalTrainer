//styles
import styled, { css } from "styled-components";
//icons
import { FaUsers } from "react-icons/fa6";
import { RiFolderVideoFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";

import Link from "next/link";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 670px) {
    margin: 2rem 0;
  }
`;

const StyledNavLink = styled(Link)`
  ${(props) =>
    props.as === "mobile" &&
    css`
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      gap: 1rem;
      &:link,
      &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: white;
        font-size: 1.1rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
      }

      &:hover,
      &:active,
      &.active:link,
      &.active:visited {
        color: var(--gold);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
      }

      & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--gold);

        transition: all 0.3s;
      }

      &:hover svg,
      &:active svg,
      &.active:link svg,
      &.active:visited svg {
        color: black !important;
      }
    `}

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--gold);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--gold);

    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: white;
  }
`;

type AdminNavbarProps = {
  variant?: string;
};

const AdminMainNav = ({ variant }: AdminNavbarProps) => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink
            as={variant === "mobile" ? "mobile" : ""}
            href="/admin/users"
          >
            <FaUsers />
            <span>Korisnici</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink
            as={variant === "mobile" ? "mobile" : ""}
            href="/admin/dashboard"
          >
            <FaChartLine />
            <span>Statistika</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            as={variant === "mobile" ? "mobile" : ""}
            href="/gallery"
          >
            <RiFolderVideoFill />
            <span>Galerija Video Vežbi</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            as={variant === "mobile" ? "mobile" : ""}
            href="/admin/plans"
          >
            <FaClipboardList />

            <span>Moji planovi</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink as={variant === "mobile" ? "mobile" : ""} href="/">
            <IoHomeSharp />

            <span>Početna</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default AdminMainNav;
