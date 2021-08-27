import { Palette } from "./palette.jsx"

export const AddNoteInput = ({ placeholder, handleChange, color, handleColorChange, handleChangeFile, onAddNote }) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const inputContainerRef = React.useRef()
    React.useEffect(() => {
        document.addEventListener('click', handleWindowClick)

        return () => document.removeEventListener('click', handleWindowClick)
    }, [])

    const handleWindowClick = (ev) => {
        if (!ev.path.includes(inputContainerRef.current)) {
            // onAddNote()
            setIsExpanded(false)
        }
    }

    return (
        <div onClick={() => setIsExpanded(true)} className="input-container" ref={inputContainerRef} style={{ borderColor: color }}>
            <input name="title" onChange={handleChange} placeholder={placeholder} autoComplete="off" />
            {isExpanded &&
                <div className="add-note-bottom">
                    <textarea
                        name="content"
                        rows="4"
                        placeholder="body"
                        onChange={handleChange}
                        style={{ border: 'none', padding: '12px 16px', outline: 'none', resize: 'none' }}
                    />
                    <div className="action-bar-container">
                        <Palette handleColorChange={handleColorChange} />
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                <i className="far fa-image"></i>
                            </label>

                            <input id="file-input" onChange={handleChangeFile} type="file" style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}