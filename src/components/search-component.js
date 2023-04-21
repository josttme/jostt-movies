import { LitElement, html, css } from 'lit'
import { goTo } from '../router'
export class SearchComponent extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        z-index: 110;
      }
      form {
        width: 90%;
        max-width: 500px;
        margin: 10px auto;
        display: grid;
        height: 40px;
        grid-template-columns: 1fr 15%;
        place-content: center;
        /*    background-color: #06459c; */
        border-radius: 10px;
        overflow: hidden;
        border-radius: 10px;
        /*   border: 1px solid #06459c; */
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.5);
      }
      form:hover,
      form:focus,
      form:active {
        border: 1px solid #fff;
      }
      input[type='search']::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        margin-left: 0.4rem;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
        cursor: pointer;
      }
      input {
        /*  background-color: #06459c; */
        transition: 0.25s ease-in;
        font-size: 18px;
        border: none;
        text-indent: 30px;
        height: 50px;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        color: white;
        background-color: transparent;
        color: #fff;
        font-weight: bold;
      }
      input:focus,
      button:focus-visible {
        border: none;
        outline: none;
        outline-color: none;
        outline-style: auto;
        outline-width: 0px;
        box-shadow: none;
      }
      input::placeholder {
        font-weight: bold;
        color: rgba(255, 255, 255, 0.4);
        color: white;
        font-size: 18px;
      }
      button {
        display: grid;
        place-content: center;
        background-color: #06459c;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
      button:focus-visible {
        background-color: #002150;
        background-color: transparent;
      }
      button:active,
      button:hover {
        background-color: #002150;
        background-color: transparent;
      }
    `
  ]

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input name="query" type="search" placeholder="Buscar..." />
        <button type="submit">
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            width="25px"
            viewBox="0 0 24 24"
          >
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            ></path>
          </svg>
        </button>
      </form>
    `
  }

  handleSubmit(e) {
    e.preventDefault()
    const inputSearch = this.renderRoot?.querySelector('input') ?? null
    let query = e.target.firstElementChild.value

    if (query === '') {
      console.error('Por favor ingresa una búsqueda')
      return
    }
    let inputValue = query
      .replace(/\s+/g, ' ')
      .replace(/<[^>]*>/g, '')
      .trim()
    goTo(`/search=${inputValue}`)
    inputSearch.value = ''
  }
}
customElements.define('search-component', SearchComponent)
