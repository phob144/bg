export const unique = (target: any, key: string | symbol): void => {
	target[key] = target.name + "." + key.toString();
};
