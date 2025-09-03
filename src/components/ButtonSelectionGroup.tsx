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
                <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">One</div>
                <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">Two</div>
                <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">Three</div>
                <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">Four</div>
            </div>
        </div>
        </div>
    </>
  )
}
