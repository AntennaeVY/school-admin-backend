module.exports.sendPasswordTemplate = (password) => {
  return `
    Tu contrasenia es:

    <h1>${password}</h1>
    `;
};
