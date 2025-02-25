export interface ResponseData {
    data?: {
        clientId?: string;
        acessToken?: string;
    };
    tokenJWT?: string;
}

export interface ResponseDataUser {
    data: {
        idUtilisateur: number;
        mail: string;
        idRole: number;
    };
    success: boolean;
    message: string;
    tokenJWT: string;
    statusCode: number;
}

export interface sessionUser {
    token?: string | undefined;
    UserId?: string | undefined;
}
