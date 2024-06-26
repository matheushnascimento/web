import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 3.2rem;

  width: 100vw;
  height: 10rem;

  padding: 2.4rem 12.3rem;

  background: ${({ theme }) => theme.COLORS.BLUE_200};

  img {
    width: 18.6rem;
  }

  .input-wrapper {
    display: flex;
    flex-grow: 1;

    gap: 1.4rem;

    border-radius: 0.5rem;

    padding: 1.2rem 1.4rem;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  }

  svg {
    width: 3.2rem !important;
    height: 3.2rem !important;

    & {
      cursor: pointer;
    }
  }

  input {
    width: 100%;

    color: ${({ theme }) => theme.COLORS.WHITE_100};

    background: none;
    border: none;
  }
`;
