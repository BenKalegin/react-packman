export class Mutator<TReadOnly, TMutable extends TReadOnly> {
  private _readOnly: TReadOnly;
  private _mutable: TMutable;

  protected get mutable(): TMutable {
    if (!this._mutable)
      this._mutable = Object.assign(<TMutable>{}, this._readOnly);
    return this._mutable;
  }

  get state(): TReadOnly {
    return !this._mutable ? this._readOnly : this._mutable;
  }

  constructor(readOnly: TReadOnly) {
    this._readOnly = readOnly;
  }
}

