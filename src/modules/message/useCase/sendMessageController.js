import { ERROS_RESPONSES } from "../../../constants/ErrorsResponses";

export class SendMessageController {
  constructor({ use_case, users_repository, credits_repository, platform }) {
    this.use_case = use_case;
    this.users_repository = users_repository;
    this.credits_repository = credits_repository;
    this.platform = platform;
  }

  async handle(request) {
    const { to, subject, message, user_id } = request;

    const user = await this.users_repository.find(user_id);

    if (user === null) {
      return ERROS_RESPONSES.USER_NOT_FOUND;
    }

    const user_has_credit = await this.credits_repository.userHasCredit(user_id, this.platform);

    if (user_has_credit === null) {
      return ERROS_RESPONSES.USER_DOESNT_HAVE_CREDIT;
    }

    const response = this.use_case.perform({
      from: user.contact(this.platform),
      to,
      subject,
      message,
    });

    return response;
  }
}
