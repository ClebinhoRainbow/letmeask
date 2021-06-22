import { useState } from "react";
// type ButtonProps = {
// 	children?: string
// };
//obs: se for ultilizado text?: string; isso indica que
//a propriedade text é opcional
// props: ButtonProps
export function Button() {
	const [counter,setCounter] = useState(0)
	function increment(){
		setCounter(counter + 1);
	}
	return <button onClick={increment}>{counter}</button>;
	//obs: o {props.text || "Default"} indica que caso a
	//props.text não seja passada (já que ela é opcinal)
	//o Default values o substitui
}
