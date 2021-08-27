const colors = ['#e8eaed', '#e6c9a8', '#fdcfe8', '#ffffff', '#d7aefb', '#aecbfa'
    , '#cbf0f8', '#a7ffeb', '#ccff90', '#fff475', '#fbbc04', '#f28b82']

export function Palette({ handleColorChange }) {
    return (
        <div className="palette-container" id="palette-container">
            <div className="color-palette" id="color-palette-icon"><i className="fas fa-palette"></i></div>
            <div className="palette-colors-container" id="palette-colors-container">
                {colors.map((color, i) => (
                    <div key={i} id={`color-${i}`} onClick={() => handleColorChange(color)} style={{ backgroundColor: color }}></div>
                ))}
            </div>
        </div>
    )
}
