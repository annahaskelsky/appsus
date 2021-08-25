export const ActionBar = ({ handleColorChange }) => {
    const colors = ['#e8eaed', '#e6c9a8', '#fdcfe8', '#ffffff', '#d7aefb', '#aecbfa'
        , '#cbf0f8', '#a7ffeb', '#ccff90', '#fff475', '#fbbc04', '#f28b82']

    return (
        <div className="action-bar-container">
            <div className="palette-container">
                <div><i className="fas fa-palette"></i></div>
                <div className="palette-colors-container">
                    {colors.map((color, i) => (
                        <div key={i} onClick={() => handleColorChange(color)} style={{backgroundColor: color}}></div>
                    ))}
                </div>
            </div>
            <div><div><i className="far fa-copy"></i></div></div>
            <div><div><i className="far fa-trash-alt"></i></div></div>
            <div><div><i className="fas fa-thumbtack"></i></div></div>
        </div>
    )
}