import * as httpRequest from '~/utils';

export const suggest = async (page, per_page) => {
  try {

    // const res = await httpRequest.get(`/users/suggested?page=${numPage}&per_page=${perPage}`)
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        per_page,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
