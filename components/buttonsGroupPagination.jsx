


const ButtonsGroupPagination = ({ className="", buttonClassName="", noOfButtons=5, buttonOnClick=() => {} }) => {

  const renderButtons = () => {
    const buttons = [];
    for(let i=0; i<=noOfButtons; i++){
      buttons.push(<button className={buttonClassName} onClick={() => buttonOnClick(i)}>{i+1}</button>)
    }
    return buttons;
  }

  return(
    <div className={className}>
      <div className="d-flex flex-wrap gap-1 justify-content-center">{renderButtons()}</div>
    </div>
  )
}

export default ButtonsGroupPagination;