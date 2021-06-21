type ButtonProps = {
	children?: string
};
//obs: se for ultilizado text?: string; isso indica que
//a propriedade text é opcional
export function Button(props: ButtonProps) {
	return <button>{props.children|| 'Default'}</button>;
	//obs: o {props.text || "Default"} indica que caso a
	//props.text não seja passada (já que ela é opcinal)
	//o Default values o substitui
}
