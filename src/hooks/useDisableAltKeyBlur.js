
// best placed on 'onKeyUp' handler
export const useDisableAltKeyBlur = () => ev => ev.key === 'Alt' && ev.preventDefault()
