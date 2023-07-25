
type InputFieldProps = {
    class?: string;
    onInput?: (e: Event) => void;
    value?: string;
    placeholder?: string;
};

function InputField(props: InputFieldProps) {
    const value = props.value || "";
    const placeholder = props.placeholder || "";
    return (
        <input
            type="text"
            class={`border-2 focus:outline-none border-cyan-700 focus:ring-1 focus:ring-cyan-700 px-1 py-1 md:px-2 md:py-2 rounded-lg ${props.class}`}
            onInput={props.onInput}
            placeholder="Search"
            value={value}
        />
    );
}

export default InputField;