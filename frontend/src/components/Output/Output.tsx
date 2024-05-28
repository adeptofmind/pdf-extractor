import './Output.css'

type Props = {
    text: string
}

const Output: React.FC<Props> = ({ text }) => (
    <div className="output-container">
        <label className="output-label">Extracted text:</label>
        <textarea className="output-textarea" readOnly value={text} />
    </div>
)

export default Output;