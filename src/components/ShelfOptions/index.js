import './index.css'

const ShelfOptions = props => {
  const {item, isSelected, updateSelectedOptions} = props
  const {label} = item

  const updateOption = () => {
    updateSelectedOptions(item)
  }

  const isSelectedCss = isSelected ? 'selected' : ''

  return (
    <li className="shelf-option">
      <button
        onClick={updateOption}
        type="button"
        className={`shelf-button ${isSelectedCss}`}
      >
        {label}
      </button>
    </li>
  )
}

export default ShelfOptions
