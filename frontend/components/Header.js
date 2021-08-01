import Link from 'next/link';
import Nav from './Nav';
import styled from 'styled-components';

const Logo = styled.h1`
   background: red;
   font-size: 4rem;
   margin-left: 1rem;
   position: relative;
   z-index: 2;
   transform: skew(-7deg);
   a {
      color: white;
      text-decoration: none;
      text-transform: uppercase;
      padding: 0.5rem 1rem;
   }
`;
const HeaderStyles = styled.header`
   .bar {
      border-bottom: 6px solid var(--black, black);
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: space-between;
      align-items: stretch;
   }
   .sub-bar {
      border-bottom: 2px solid black;
      p{
         margin-left: 1rem;
      }
   }
   
`;
export default function Header() {
   return (
      <HeaderStyles>
         <div className="bar">
            <Logo>
               <Link href="/">
                  <a>Sick Fits</a>
               </Link>
            </Logo>
            <Nav />
         </div>
         <div className="sub-bar">
            <p>Search</p>
         </div>
      </HeaderStyles>
   );
}
