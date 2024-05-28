import './UploadFileForm.css';

type Props = {
    title: string
    fieldName: string
    fieldAccept: string
    buttonLabel: string
    buttonDisabled: boolean
    onSubmit: React.FormEventHandler
}

const UploadFileForm: React.FC<Props> = ({ title, fieldName, fieldAccept, buttonLabel, buttonDisabled, onSubmit }) => (
    <div className="upload-file-container">
        <h1 className="upload-file-title">{title}</h1>
        <form className="upload-file-form" encType="multipart/form-data" onSubmit={onSubmit}>
            <input type="file" name={fieldName} accept={fieldAccept} required />
            <button type="submit" disabled={buttonDisabled}>{buttonLabel}</button>
        </form>
    </div>
)

export default UploadFileForm
