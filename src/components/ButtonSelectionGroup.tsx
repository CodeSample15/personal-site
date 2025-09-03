interface Props {
    list_titles: string[];
    list_content: string[];
}

export const ButtonSelectionGroup = ({ list_titles, list_content }: Props) => {
  return (
    <>
        <div className="row">
        <div className="col-4">
            <div className="list-group" id="list-tab" role="tablist">
                {
                    list_titles.map((item, index) => (
                        <a className={"list-group-item list-group-item-action " + (index==0?'active':'')} id={`list-${item}-list`} data-bs-toggle="list" href={`#list-${item}`} role="tab" aria-controls={`list-${item}`} key={index}>{item}</a>
                    ))
                }
            </div>
        </div>
        <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
                {
                    list_content.map((item, index)=>(
                        <div className={"tab-pane fade " + (index==0?"show active":"")} id={`list-${list_titles[index]}`} role="tabpanel" aria-labelledby={`list-${list_titles[index]}-list`} key={index}>{item}</div>
                    ))
                }
            </div>
        </div>
        </div>
    </>
  )
}
