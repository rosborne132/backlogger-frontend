import styled from 'styled-components'

export const appHomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;

    .appNav {
        flex: 1;
        background-color: #fff;
    }
      
      
    main {
        flex: 3;
        margin: 10px 50px;
    }
`

export const appNav = styled.nav`
display: flex;
    flex: 1;
    background-color: #fff;
`

export const appMain = styled.main`
display: flex;
    flex: 3;
    margin: 10px 50px;
`