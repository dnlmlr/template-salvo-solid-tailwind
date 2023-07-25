function CheckBox(props: { checked?: boolean; onChange?: (e: Event) => void }) {
    return (
        <input
            type="checkbox"
            checked={props.checked}
            onChange={props.onChange}
            class="w-4 h-2 md:w-6 md:h-6 flex-shrink-0"
        />
    );
}

export default CheckBox;