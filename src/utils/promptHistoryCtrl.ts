import Parse from "parse"

export const saveNewPrompt = async (prompt: string, code: string) => {
    const newPrompt = new Parse.Object('PromptHistory');
    newPrompt.set('prompt', prompt);
    newPrompt.set('code', code);
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setRoleReadAccess('admin', true);
    acl.setRoleWriteAccess('admin', true);
    newPrompt.setACL(acl);
    await newPrompt.save();
}