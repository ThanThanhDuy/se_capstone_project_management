const loginApi = email => {
  // role 1 is admin
  // role 2 is teacher
  // role 3 is student
  return new Promise(resolve => {
    setTimeout(() => {
      let account;
      if (email === "duyttse140971@fpt.edu.vn") {
        account = {
          data: {
            payload: {
              user: {
                _id: "123124654645646546",
                name: "duy admin",
                role: 1,
                status: 1
              },
              auth: {
                token: "klajshdkfljahsdnzmvnajhvpqawnvmnm,nakjhsjahslkadfj",
                tokenExpiresIn: 1800000,
                refresh: "asjkdhflakjshdflkjahsdfkjahskdfasdkf",
                refreshExpiresIn: 691200000
              }
            }
          }
        };
      } else if (email === "thanthanhduy0111@gmail.com") {
        account = {
          data: {
            payload: {
              user: {
                _id: "123124654645646546",
                name: "duy teacher",
                role: 2,
                status: 1
              },
              auth: {
                token: "klajshdkfljahsdnzmvnajhvpqawnvmnm,nakjhsjahslkadfj",
                tokenExpiresIn: 1800000,
                refresh: "asjkdhflakjshdflkjahsdfkjahskdfasdkf",
                refreshExpiresIn: 691200000
              }
            }
          }
        };
      } else if (email === "thanthanhduy.work@gmail.com") {
        account = {
          data: {
            payload: {
              user: {
                _id: "123124654645646546",
                name: "duy student",
                role: 3,
                status: 1
              },
              auth: {
                token: "klajshdkfljahsdnzmvnajhvpqawnvmnm,nakjhsjahslkadfj",
                tokenExpiresIn: 1800000,
                refresh: "asjkdhflakjshdflkjahsdfkjahskdfasdkf",
                refreshExpiresIn: 691200000
              }
            }
          }
        };
      }
      resolve(account);
    }, 2000);
  });
};
export default {
  loginApi
};
