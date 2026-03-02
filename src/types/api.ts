export type ServerResponse<DataType> = {
  isError: boolean;
  data: DataType;
};