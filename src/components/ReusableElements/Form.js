
export const Form = ({ formfields, onsubmit}) => {

    return (
        <form type="submit" onSubmit={onsubmit} >
            {formfields}
        </form>
    )
}